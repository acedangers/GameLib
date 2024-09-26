import { makeAutoObservable, runInAction } from "mobx";
import { Category } from "../models/category";
import agent from "../api/agent";

export default class CategoryStore {
  categoryRegistry = new Map<string, Category>();
  selectedCategory: Category | undefined = undefined;

  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  private setCategory = (category: Category) => {
    this.categoryRegistry.set(category.id, category);
  };

  get categoriesByLength() {
    const categories = Array.from(this.categoryRegistry.values()).sort(
      (a, b) => b.gameIds.length - a.gameIds.length
    );
    return categories;
  }

  get groupedCategories() {
    return Object.entries(
      this.categoriesByLength.reduce((categories, category) => {
        const name = category.name;
        categories[name] = categories[name] ? [...categories[name], category] : [category];
        return categories;
      }, {} as { [key: string]: Category[] })
    );
  }

  loadCategories = async () => {
    this.setLoadingInitial(true);
    try {
      const categories = await agent.Categories.list();
      categories.forEach((category) => {
        this.setCategory(category);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  };

  private getCategory = (name: string) => {
    for (const [, category] of this.categoryRegistry) {
      if (category.name === name) {
        return category;
      }
    }
  };

  loadCategory = async (name: string) => {
    let category = this.getCategory(name);

    if (category) {
      console.log(
        `Setting category from cache: ${category.name}, ${category.gameIds.map(
          (c) => " " + c
        )}`
      );

      runInAction(() => {
        this.selectedCategory = category; // Use cached category if complete
      });

      return category;
    } else {
      console.log(`Setting category from api.`);

      this.setLoadingInitial(true);
      try {
        category = await agent.Categories.details(name);

        runInAction(() => {
          this.setCategory(category!); // Cache the new category
          this.selectedCategory = category; // Set the newly fetched category
        });
        
        return category;
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingInitial(false);
      }
    }
  };
}
