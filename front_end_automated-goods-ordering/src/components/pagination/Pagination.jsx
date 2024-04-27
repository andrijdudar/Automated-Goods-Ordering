import "./Pagination.css";

export const Pagination = () => {
  return (
  //  <div className="container">
      <div className="pagination">
        <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
          <ul class="pagination-list">
            <li><a href="#/" class="pagination-link" aria-label="Goto page 1">1</a></li>
            <li><span class="pagination-ellipsis">&hellip;</span></li>
            <li><a href="#/" class="pagination-link" aria-label="Goto page 45">45</a></li>
            <li><a href="#/" class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
            <li><a href="#/" class="pagination-link" aria-label="Goto page 47">47</a></li>
            <li><span class="pagination-ellipsis">&hellip;</span></li>
            <li><a href="#/" class="pagination-link" aria-label="Goto page 86">86</a></li>
          </ul>
          <a href="#/" class="pagination-previous">Previous</a>
          <a href="#/" class="pagination-next">Next page</a>
        </nav>
        </div>
  //  </div>
  );
};
