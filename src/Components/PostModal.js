import React from 'react'

const PostModal = ({ postTitle, postBody, closeModal }) => {
    const handleClickOutside = (e) => {
        if (e.target.classList.contains('modal-content-wrapper')) {
            closeModal();
        }
    };
    return (
        <div className="modal-content-wrapper" onClick={handleClickOutside}>
            <div className='modal-content-block'>
                <span className="modal-close" onClick={closeModal}>
                    &#10060;
                </span>
                <h2>{postTitle}</h2>
                <p>{postBody}</p>
            </div>
        </div>
    );
};
export default PostModal