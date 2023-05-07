export default function Filter() {
  return (
    <form className="filter-form">
      <p className="filter-form-title">Category</p>
      <label>
        <input type="radio" name="category" value="all" checked />
        All jobs
      </label>
      <label>
        <input type="radio" name="category" value="developer" />
        Developer
      </label>
      <label>
        <input type="radio" name="category" value="designer" />
        Designer
      </label>
      <hr />
    </form>
  );
}
