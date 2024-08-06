import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import productCategory from '../helper/productCategory.jsx';
import SearchProductcard from '../components/SearchProductcard.jsx';
import summaryApi from '../common/index.js';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const URLSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = URLSearch.getAll("category")
  const URLCategoryList = {}
  urlCategoryListinArray.forEach(el => {
    URLCategoryList[el] = true
  })

  const [select, setSelect] = useState(URLCategoryList);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy , setSortBy] = useState("")

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.filterProduct.url, {
        method: summaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          category: filterCategoryList
        })
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (e) => {
    const { name, value, checked } = e.target;
    setSelect((prev) => ({
      ...prev,
      [value]: checked
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(select).map(categoryKeyName => {
      if (select[categoryKeyName]) {
        return categoryKeyName;
      }
      return null;
    }).filter(el => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el,index) => {
      if((arrayOfCategory.length - 1 ) === index) {
        return `category=${el}`
      }
      
      return `category=${el}&&`
    })
    navigate("/product-category?"+urlFormat.join(""))
  }, [select]);

  const handleOnChangeSortBy = (e) => {
    const {value} = e.target;

    setSortBy(value)

    if(value === "asc") {
      setData(prev => prev.sort((a,b) => a.selling - b.selling))
    }
    if(value === "dsc") {
      setData(prev => prev.sort((a,b) => b.selling - a.selling))
    }
  }
  useEffect(()=> {

  },[sortBy])

  return (
    <div className='container mx-auto p-4'>
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-140px)] overflow-y-scroll'>
          {/* sortby */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-2'>
                <input type='radio' name='sortBy' checked={sortBy === "asc"} value={"asc"} onChange={handleOnChangeSortBy}/>
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-2'>
                <input type='radio' name='sortBy' value={"dsc"} checked={sortBy === "dsc"} onChange={handleOnChangeSortBy} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          {/* filter By */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <input type='checkbox' name="category" checked={select[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelect} />
                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                  </div>
                ))
              }
            </form>
          </div>
        </div>
        {/* right side */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              data?.length !== 0 && (
                <SearchProductcard data={data} loading={loading} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
