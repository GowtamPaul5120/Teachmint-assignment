import React from 'react'

const PostModal = ({ postTitle, postBody, closeModal }) => {
    return (
        <div className="modal-content-wrapper">
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