import React, { lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopDeals } from '../../redux/slices/topDealsSlice.js';
import { Link } from 'react-router-dom';
const AppLoader = lazy(() => import('../common/AppLoader.jsx'));

const TopDeals = () => {

  // Using redux-toolkit to fetch Top Deals
  const topDeals = useSelector(state => state.topDeals.topDeals)
  const loading = useSelector(state => state.topDeals.loading)
  const dispatch = useDispatch();

  useEffect(() => {
    if (topDeals === undefined || topDeals.length === 0)
      fetchTopDeals(dispatch)
  }, [])

  if (loading) return <AppLoader />
  else
    return (
      <div>
        <section>
          <div className='container rounded bg-secondary-subtle mt-3 pb-2'>
            <div className='fs-3 fw-medium text-start m-2 pt-3 py-2'>
              Today's best deal
              <div className='ms-2 fs-5 text-info d-inline-block'>
                <Link to={'/products'} className='text-decoration-none'>See more</Link>
              </div>
            </div>
            <div className='row justify-content-around justify-content-md-between gap-3 mx-2'>
              {
                topDeals?.map(topDeal => {
                  return (
                    <div key={topDeal.id} className="card bg-secondary-subtle p-1 p-sm-2 mb-3 col-5 col-sm-3 col-lg-2" >
                      <Link to={"/products?productId=" + topDeal.id} className='text-decoration-none text-white'>
                        <img src={topDeal.image}
                          className="rounded mx-auto mt-2" width={"100px"} height={"130px"} alt="Card 1" />
                        <div className="c-body mt-2" >
                          <p className="card-title">{topDeal.name}</p>
                          <p className="card-text fw-medium">{topDeal.price ? 'starting from \u20B9'.concat(topDeal.price) : topDeal.text}</p>
                        </div>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </section>
      </div>
    )
}

export default TopDeals
