// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import DishList from '../components/DishList';
import { fetchDishes } from '../services/apiService';

function HomePage() {
  const [dishes, setDishes] = useState([]);
  const [total, setTotal] = useState(0);

  // Page
  const [page, setPage] = useState(1);
  const [limit] = useState(500);

  // For searching & filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [dietFilter, setDietFilter] = useState('');

  // For sorting
  const [sortField, setSortField] = useState('');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const params = { page, limit };
        if (searchTerm) params.search = searchTerm;
        if (dietFilter) params.diet = dietFilter;
        if (sortField) params.sort = sortField;
        if (sortDir) params.sortDir = sortDir;

        const data = await fetchDishes(params);
        setDishes(data.data);
        setTotal(data.total);
      } catch (err) {
        console.error('Error fetching dishes:', err);
      }
    };
    loadDishes();
  }, [page, limit, searchTerm, dietFilter, sortField, sortDir]);

  const handleSortChange = (field, dir) => {
    setSortField(field);
    setSortDir(dir);
    setPage(1);
  };

  return (
    <div className="container">
      <h2>All Dishes</h2>
      <div className="filters">
        <div>
          <label>Search: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            placeholder="e.g. dosa"
          />
        </div>
        <div>
          <label>Diet: </label>
          <select
            value={dietFilter}
            onChange={(e) => { setDietFilter(e.target.value); setPage(1); }}
          >
            <option value="">All</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non vegetarian">Non-Vegetarian</option>
          </select>
        </div>
      </div>

      <DishList
        dishes={dishes}
        total={total}
        page={page}
        pageSize={limit}
        onSortChange={handleSortChange}
        onPageChange={(p) => setPage(p)}
        onPageSizeChange={(sz) => console.log('new pageSize:', sz)}
      />
    </div>
  );
}

export default HomePage;
