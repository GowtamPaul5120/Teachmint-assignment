import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const DirectoryPage = () => {
    const navigate = useNavigate()
    const userIdMap = useSelector(state => state.userIdMap);

    ////////////// navigate to profile page
    const clickHandler = (flag) => {
        navigate(`/profile-page/${flag}`);
    };

    return (
        <>
            <section className='DirectoryPage-section'>
                <div className='directory-content-wrapper'>
                    <h1>User Directory</h1>
                    <div className='user-card-wrapper'>
                        {Array.isArray(userIdMap) &&
                            userIdMap.map((item) => (
                                <div className='user-card' key={item.id} onClick={() => clickHandler(item.id)}>
                                    <h3>Name:<span>{item.name}</span></h3>
                                    <h3>Posts:<span>{item.posts.length}</span></h3>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default DirectoryPage