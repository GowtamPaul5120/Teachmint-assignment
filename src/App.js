import { Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import DirectoryPage from './Pages/DirectoryPage/DirectoryPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import { useEffect, useState } from 'react';
import { getPosts, getUsers } from './API/Api';
import { useDispatch } from 'react-redux';
import { setPageId, setUserIdMap } from './Redux/Actions';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await getUsers();
        const postsResponse = await getPosts();
        setUsers(usersResponse);
        setPosts(postsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userIdMap = [];

    posts.forEach(post => {
      const user = users.find(userData => userData.id === post.userId);

      if (!userIdMap[user?.id]) {
        userIdMap[user?.id] = {
          id: user?.id,
          name: user?.name,
          username: user?.username,
          catchPhrase: user?.company?.catchPhrase,
          address: {
            street: user?.address?.street,
            suite: user?.address?.suite,
            city: user?.address?.city,
            zipcode: user?.address?.zipcode,
            geo: {
              lat: user?.address?.geo?.lat,
              lng: user?.address?.geo?.lng,
            }
          },
          email: user?.email,
          phone: user?.phone,
          posts: []
        };
      }
      userIdMap[user?.id].posts.push(post);
    });

    const filteredUserIdMap = userIdMap.filter(user => user !== null);

    dispatch(setUserIdMap(filteredUserIdMap));
    dispatch(setPageId(id));

  }, [posts, users]);

  return (
    <div className='App'>
      <Routes>
        <Route path="/profile-page/:id" element={<ProfilePage />} />
        <Route path="/" element={<DirectoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
