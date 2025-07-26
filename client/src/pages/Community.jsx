import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations || []);
      } else {
        toast.error(data.message || 'Failed to fetch creations');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  if (loading) return <div className="p-6">Loading creations...</div>;

  if (!creations.length)
    return <div className="p-6 text-gray-500">No creations found.</div>;

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <h1 className="text-xl font-semibold mb-4">Creations</h1>

      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll flex flex-wrap'>
        {creations.map((creation, index) => (
          <div
            key={index}
            className='relative group p-3 w-full sm:w-1/2 lg:w-1/3'
          >
            <img
              src={creation.content}
              alt={`creation-${index}`}
              className='w-full h-64 object-cover rounded-lg'
            />

            <div className='absolute inset-0 flex flex-col justify-end p-3 text-white
              bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100
              transition-opacity rounded-lg'>
              <p className='text-sm mb-2'>{creation.prompt}</p>
              <div className='flex items-center gap-1'>
                <p>{creation.likes?.length || 0}</p>
                <Heart
                  className={`min-w-5 hover:scale-110 cursor-pointer ${
                    creation.likes?.includes(user.id)
                      ? 'fill-red-500 text-red-600'
                      : 'text-white'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;

