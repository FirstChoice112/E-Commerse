import "./AddProduct.css";
const Addproduct = () => {
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" name="name" placeholder="Type here" />
      </div>
    </div>
  );
};

export default Addproduct;
