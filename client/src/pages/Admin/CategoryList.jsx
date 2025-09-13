import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";

import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a category name");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success("Category created successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updateName) {
      toast.error("Please enter a category name");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updateName,
        },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Category updated successfully");
        setSelectedCategory(null);
        setUpdateName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId).unwrap();
        toast.success("Category deleted successfully");
        setSelectedCategory(null);
        setUpdateName("");
        setModalVisible(false);
      } catch (error) {
        let errorMessage = "An unexpected error occurred";
        if (error.data && error.data.message) {
          errorMessage = error.data.message;
        } else if (error.error) {
          errorMessage = error.error;
        }
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu/>
      <div className="md: w-3/4 p-3">
        <div className="h-12">Manage categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded-lg m-3 hover:bg-blue-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdateName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updateName}
            setValue={(value) => setUpdateName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={() => handleDeleteCategory(selectedCategory._id)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
