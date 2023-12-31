import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createcategory, listcategory } from "../../Redux/Actions/CategoryAction";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstant";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCategory = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, category } = categoryCreate;


  const handleDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setImage(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
  
	}


  useEffect(() => {
    dispatch(listcategory());

    if (category) {
      toast.success("Category Added", ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET });
      setName("");
      setImage("");
    }

  }, [category, dispatch]);


  const submitHandler = (e) => {
    e.preventDefault();
if(name ==="")
{
  toast.error("Le nom est requis", ToastObjects);

}
    else if (image==="")
    {
      toast.error("Image non trouvée ", ToastObjects);

    }
    else
    dispatch(createcategory(image,name));
  };

  return (
    <div className="col-md-12 col-lg-4">
        <Toast/>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
        {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
          <label htmlFor="product_name" className="form-label">
          Nom de catégorie
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Image</label>
          <input className="form-control" type="file" name="image" accept="image/*" required onChange={handleDataChange}/>
        </div>
        <div className="d-grid">
          <button className="btn btn-primary py-2">Créer une catégorie</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
