<script setup lang="ts">
import ProductCard from "~/features/products/components/ProductCard.vue";
import { products } from "~/features/products/data/products";
import type { ProductCategory } from "~/features/products/types/product";

type CategoryFilter = "all" | ProductCategory;

type SortOption = "default" | "price-asc" | "price-desc";

const route = useRoute();
const router = useRouter();

const initialSearch = typeof route.query.q === "string" ? route.query.q : "";

const searchTerm = ref(initialSearch);

const { locale, t } = useI18n();

const categoryValues: CategoryFilter[] = [
  "all",
  "copper",
  "ceramic",
  "painting",
];

const sortValues: SortOption[] = ["default", "price-asc", "price-desc"];

const categoryOptions: Array<{
  value: CategoryFilter;
  label: string;
}> = [
  {
    value: "all",
    label: "catalog.filters.allCategories",
  },
  {
    value: "copper",
    label: "catalog.filters.copper",
  },
  {
    value: "ceramic",
    label: "catalog.filters.ceramic",
  },
  {
    value: "painting",
    label: "catalog.filters.painting",
  },
];

const sortOptions: Array<{
  value: SortOption;
  label: string;
}> = [
  {
    value: "default",
    label: "catalog.sort.default",
  },
  {
    value: "price-asc",
    label: "catalog.sort.priceAscending",
  },
  {
    value: "price-desc",
    label: "catalog.sort.priceDescending",
  },
];

function updateQuery(key: "category" | "sort" | "q", value?: string) {
  const query = { ...route.query };

  if (value) {
    query[key] = value;
  } else {
    delete query[key];
  }

  router.replace({ query });
}

const selectedCategory = computed<CategoryFilter>({
  get() {
    const value =
      typeof route.query.category === "string" ? route.query.category : "all";

    return categoryValues.includes(value as CategoryFilter)
      ? (value as CategoryFilter)
      : "all";
  },

  set(value) {
    updateQuery("category", value === "all" ? undefined : value);
  },
});

const selectedSort = computed<SortOption>({
  get() {
    const value =
      typeof route.query.sort === "string" ? route.query.sort : "default";

    return sortValues.includes(value as SortOption)
      ? (value as SortOption)
      : "default";
  },

  set(value) {
    updateQuery("sort", value === "default" ? undefined : value);
  },
});

watch(searchTerm, (value, _, onCleanup) => {
  const timeout = setTimeout(() => {
    const normalizedValue = value.trim();

    updateQuery("q", normalizedValue || undefined);
  }, 300);

  onCleanup(() => {
    clearTimeout(timeout);
  });
});

watch(
  () => route.query.q,
  (value) => {
    const normalizedValue = typeof value === "string" ? value : "";

    if (normalizedValue !== searchTerm.value) {
      searchTerm.value = normalizedValue;
    }
  },
);
const filteredProducts = computed(() => {
  let result = [...products];

  // فیلتر دسته‌بندی
  if (selectedCategory.value !== "all") {
    result = result.filter((product) => {
      return product.categorySlug === selectedCategory.value;
    });
  }

  // جست‌وجوی محصول
  const searchQuery =
    typeof route.query.q === "string"
      ? route.query.q.trim().toLocaleLowerCase()
      : "";

  if (searchQuery) {
    const currentLocale = locale.value as "fa" | "en";

    result = result.filter((product) => {
      const searchableText = [
        product.title[currentLocale],
        product.category[currentLocale],
        product.description[currentLocale],
      ]
        .join(" ")
        .toLocaleLowerCase();

      return searchableText.includes(searchQuery);
    });
  }

  // مرتب‌سازی قیمت از کم به زیاد
  if (selectedSort.value === "price-asc") {
    result.sort((firstProduct, secondProduct) => {
      return firstProduct.price - secondProduct.price;
    });
  }

  // مرتب‌سازی قیمت از زیاد به کم
  if (selectedSort.value === "price-desc") {
    result.sort((firstProduct, secondProduct) => {
      return secondProduct.price - firstProduct.price;
    });
  }

  return result;
});

const hasActiveFilters = computed(() => {
  return (
    selectedCategory.value !== "all" ||
    selectedSort.value !== "default" ||
    searchTerm.value.trim() !== ""
  );
});

function resetFilters() {
  searchTerm.value = "";

  router.replace({
    query: {},
  });
}

const formattedProductCount = computed(() => {
  const numberLocale = locale.value === "fa" ? "fa-IR" : "en-US";

  return new Intl.NumberFormat(numberLocale).format(
    filteredProducts.value.length,
  );
});

useSeoMeta({
  title: () => t("seo.catalog.title"),
  description: () => t("seo.catalog.description"),
  ogTitle: () => t("seo.catalog.title"),
  ogDescription: () => t("seo.catalog.description"),
  ogType: "website",
});
</script>

<template>
  <section class="bg-canvas py-10 sm:py-14 lg:py-16">
    <AppContainer>
      <header class="max-w-2xl">
        <p class="text-sm font-semibold text-brand">
          {{ $t("catalog.eyebrow") }}
        </p>

        <h1 class="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          {{ $t("catalog.title") }}
        </h1>

        <p class="mt-4 text-lg leading-8 text-muted">
          {{ $t("catalog.description") }}
        </p>
      </header>
      <div class="mt-8 max-w-xl">
        <label
          for="product-search"
          class="mb-2 block text-sm font-medium text-ink"
        >
          {{ $t("catalog.search.label") }}
        </label>

        <input
          id="product-search"
          v-model="searchTerm"
          type="search"
          :placeholder="$t('catalog.search.placeholder')"
          class="min-h-12 w-full rounded-xl border border-line bg-surface px-4 text-ink outline-none placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div
        class="mt-10 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <p class="text-sm font-medium text-muted">
          {{
            $t("catalog.productCount", {
              count: formattedProductCount,
            })
          }}
        </p>

        <div class="flex flex-col gap-4 sm:flex-row">
          <label class="grid gap-2 text-sm font-medium text-ink">
            {{ $t("catalog.filters.category") }}

            <select
              v-model="selectedCategory"
              class="min-h-11 rounded-xl border border-line bg-surface px-4 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            >
              <option
                v-for="option in categoryOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ $t(option.label) }}
              </option>
            </select>
          </label>

          <label class="grid gap-2 text-sm font-medium text-ink">
            {{ $t("catalog.sort.label") }}

            <select
              v-model="selectedSort"
              class="min-h-11 rounded-xl border border-line bg-surface px-4 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            >
              <option
                v-for="option in sortOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ $t(option.label) }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div
        v-if="filteredProducts.length"
        class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div
        v-else
        class="mt-8 rounded-3xl border border-line bg-surface px-6 py-16 text-center"
      >
        <h2 class="text-xl font-bold text-ink">
          {{ $t("catalog.noResults.title") }}
        </h2>

        <p class="mt-3 text-muted">
          {{ $t("catalog.noResults.description") }}
        </p>

        <button
          v-if="hasActiveFilters"
          type="button"
          class="mt-6 min-h-11 rounded-xl bg-brand px-6 font-semibold text-white transition hover:opacity-90"
          @click="resetFilters"
        >
          {{ $t("catalog.noResults.reset") }}
        </button>
      </div>
    </AppContainer>
  </section>
</template>
