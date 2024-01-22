import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5173/json/categories.json")
      .then(res => setCategories(res.data.categories))
      .catch(err => console.log(err.msg))
  }, [])

  return (
    <div className='home container'>

      {/* Homepage Categories Section */}
      <section id="categoriesSection">
        <div className='container bg-secondary-subtle rounded'>
          <div className='row pt-4 mb-3 gap-2'>
            {
              categories?.map(category =>
                <div key={category.id} className="col-3 col-sm-2 col-lg-1 flex-fill">
                  <img className="rounded-circle m-auto mt-2-circle" width="70" height="70"
                    src={category.image}
                    aria-label="Category1 Image">
                  </img>
                  <p className='mt-1'>{category.name}</p>
                </div>
              )
            }
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home