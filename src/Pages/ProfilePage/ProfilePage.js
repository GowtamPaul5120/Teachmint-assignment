import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getCountryList, getTime } from "../../API/Api";
import PostModal from "../../Components/PostModal";
import resumeBtn from "../../Images/play-button.png"
import pauseBtn from "../../Images/pause-button.png"

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const [countryList, setCountryList] = useState();
    const [selectedLocation, setSelectedLocation] = useState("");
    const [timeString, setTimeString] = useState("00:00:00");
    const [pauseTime, setPauseTime] = useState(false);
    const [modalShow, setModalShow] = useState(null);

    const userIdMap = useSelector((state) => state.userIdMap);
    const { id } = useParams();

    ////////////// Get time from location
    const fetchTime = async () => {
        try {
            const timeString = await getTime(selectedLocation);
            setTimeString(timeString);
        } catch (error) {
            console.error(error);
        }
    };

    ////////////// Get all country list
    const fetchCountry = async () => {
        try {
            setLoading(true);
            const newCountryList = await getCountryList();
            setCountryList(newCountryList);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    ////////////// Set new country
    const handleSelectChange = (event) => {
        const newLocation = event.target.value;
        setSelectedLocation(newLocation);
    };

    ////////////// Seperate time into HH:MM:SS
    const parseTimeString = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        return { hours, minutes, seconds };
    };

    ////////////// Increase time by 1000ms
    const incrementTime = ({ hours, minutes, seconds }) => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
                if (hours === 24) {
                    hours = 0;
                }
            }
        }
        return { hours, minutes, seconds };
    };

    ////////////// formatting time to required mode
    const formatTimeString = ({ hours, minutes, seconds }) => {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(2, "0")}`;
    };

    ////////////// pause and resume button
    const pauseStart = () => {
        setPauseTime((prevPauseTime) => !prevPauseTime);
    };

    const openModal = (post) => {
        setModalShow(post);
    };

    const closeModal = () => {
        setModalShow(null);
    };

    ////////////// time running function
    useEffect(() => {
        let resultTime;

        if (!pauseTime) {
            const initialTime = parseTimeString(timeString);
            let currentTime = initialTime;

            resultTime = setInterval(() => {
                currentTime = incrementTime(currentTime);
                setTimeString(formatTimeString(currentTime));
            }, 1000);
        }

        return () => clearInterval(resultTime);
    }, [timeString, pauseTime]);

    ////////////// get time of the selected country
    useEffect(() => {
        if (selectedLocation !== "") {
            fetchTime();
        }
    }, [selectedLocation]);

    ////////////// get user data and country list
    useEffect(() => {
        const currentPageId = parseInt(id) - 1;

        if (userIdMap && userIdMap[currentPageId]) {
            setCurrentUser(userIdMap[currentPageId]);
            fetchCountry();
        } else {
            console.error("User data not available.");
        }
    }, [userIdMap, id]);



    return (
        <>
            {loading ? <LoadingPage /> : <></>}
            <section className="ProfilePage-section">
                <div className="profilepage-content-wrapper">
                    <div className="profilepage-top-section">
                        <Link className="button-class back-btn" to="/">
                            Back
                        </Link>
                        <div className="country-clock-block">
                            <select
                                id="locationSelect"
                                className="country-block button-class"
                                value={selectedLocation}
                                onChange={handleSelectChange}
                            >
                                <option value="">Select a Country</option>
                                {countryList &&
                                    countryList.map((item) => {
                                        return (
                                            <option
                                                value={`${item.continent}/${item.country}${item.state ? `/${item.state}` : ""
                                                    }`}
                                            >
                                                {item.country}
                                                {item.state ? `/ ${item.state}` : ""}
                                            </option>
                                        );
                                    })}
                            </select>
                            <p className="time-button button-class">{timeString}</p>
                            {pauseTime ? (
                                <button
                                    className="resume-btn button-class"
                                    onClick={pauseStart}
                                >
                                    <img className="play-pause-btn" src={resumeBtn} /> Resume
                                </button>
                            ) : (
                                <button className="pause-btn button-class" onClick={pauseStart}>
                                    <img className="play-pause-btn" src={pauseBtn} />Pause
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="profilepage-profile-section">
                        <h1>Profile Page</h1>
                        <h2>{currentUser.name}'s Posts</h2>
                        <div className="profile-user-details">
                            <div className="user-name-catchphrase">
                                {currentUser && (
                                    <>
                                        <p>
                                            Name:<b>{currentUser.name}</b>
                                        </p>
                                        <p className="profile-details">
                                            <span>
                                                Username: <b>{currentUser.username}</b>
                                            </span>
                                            &nbsp;|&nbsp;
                                            <span>
                                                Catch Phrase: <b>{currentUser.catchPhrase}</b>
                                            </span>
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="user-address-contact">
                                {currentUser && currentUser.address && (
                                    <>
                                        <p>Address:</p>
                                        <b>
                                            <p>{currentUser.address.suite}</p>
                                            <p>{currentUser.address.street},</p>
                                            <p>
                                                {currentUser.address.city},{" "}
                                                {currentUser.address.zipcode}
                                            </p>
                                        </b>
                                    </>
                                )}
                                <p>
                                    <span>
                                        Email: <b>{currentUser.email}</b>
                                    </span>
                                    &nbsp;|&nbsp;
                                    <span>
                                        Phone:{" "}
                                        <b>{currentUser.phone}</b>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="post-content-wrapper">
                            {currentUser &&
                                currentUser.posts &&
                                currentUser?.posts?.map((post) => {
                                    return (
                                        <div
                                            className="post-content-card"
                                            key={post.id}
                                            onClick={() => openModal(post)}
                                        >
                                            <h4>{post.title}</h4>
                                            <p key={post.id}>{post.body}</p>
                                        </div>
                                    );
                                })}

                            {modalShow && (
                                <PostModal
                                    postTitle={modalShow.title}
                                    postBody={modalShow.body}
                                    closeModal={closeModal}
                                />
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfilePage;
