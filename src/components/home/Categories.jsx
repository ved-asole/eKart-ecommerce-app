import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_APP_URL, JSON_EXTENSION } from '../../util/commonConstants';

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(BASE_APP_URL.concat("/json/categories").concat(JSON_EXTENSION))
      .then(res => setCategories(res.data.categories))
      .catch(err => console.log(err.msg))
  }, [])

  return (
    <section id="categoriesSection">
      <div className='container bg-secondary-subtle rounded'>
        <div className='row pt-4 mb-3 gap-2'>
          {
            categories?.map(({ id, image, name }) =>
              <div key={id} className="col-3 col-sm-2 col-lg-1 flex-fill">
                <img className="rounded-circle m-auto mt-2-circle" width="70" height="70"
                  src={image}
                  aria-label={name.concat(" Category")}>
                </img>
                <p className='mt-1'>{name}</p>
              </div>
            )}
        </div>
      </div>
    </section>

  )
}

export default Categories