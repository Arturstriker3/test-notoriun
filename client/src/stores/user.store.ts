import { defineStore } from "pinia";
import categoriesService from "@/core/services/categories";
import { IChildrenCategoriesReturn } from "@/core/interfaces/categories.interface";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [],
    isCategoriesServiceCall: false,
  }),

  actions: {
    async getCategories() {
      this.isCategoriesServiceCall = true;
      try {
        const response = await categoriesService.get();
        this.categories = response.data;
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw new Error("Falha ao carregar categorias");
      } finally {
        this.isCategoriesServiceCall = false;
      }
    },

    async updateCategory(newName: string, categoryId: string) {
      this.isCategoriesServiceCall = true;
      try {
        await categoriesService.patch(newName, categoryId);
      } catch (error) {
        console.error("Erro ao atualizar a categoria:", error);
        throw new Error("Falha ao atualizar a categoria");
      } finally {
        this.getCategories();
      }
    },

    async deleteCategory(categoryId: string) {
      this.isCategoriesServiceCall = true;
      try {
        await categoriesService.delete(categoryId);
      } catch (error) {
        console.error("Erro ao deletar a categoria:", error);
        throw new Error("Falha ao deletar a categoria");
      } finally {
        this.getCategories();
      }
    },

    async createCategory(name: string) {
      this.isCategoriesServiceCall = true;
      try {
        await categoriesService.post(name);
      } catch (error) {
        console.error("Erro ao criar a categoria:", error);
        throw new Error("Falha ao criar a categoria");
      } finally {
        this.getCategories();
      }
    },

    async createSubCategory(name: string, parentId: string) {
      this.isCategoriesServiceCall = true;
      try {
        await categoriesService.postChildren(name, parentId);
      } catch (error) {
        console.error("Erro ao criar a subcategoria:", error);
        throw new Error("Falha ao criar a subcategoria");
      } finally {
        this.getCategories();
      }
    },

    async getSubCategories(
      categoryId: string
    ): Promise<IChildrenCategoriesReturn> {
      this.isCategoriesServiceCall = true;
      try {
        const response = await categoriesService.getChildrens(categoryId);

        const result: IChildrenCategoriesReturn = {
          children: response.data.children ?? [],
          hasChildren: response.data.hasChildren ?? false,
        };

        console.log("Categorias filtradas:", result);
        return result;
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw new Error("Falha ao carregar categorias");
      } finally {
        this.isCategoriesServiceCall = false;
      }
    },
  },

  getters: {
    categoriesCount(state) {
      return state.categories.length || 0;
    },
  },
});