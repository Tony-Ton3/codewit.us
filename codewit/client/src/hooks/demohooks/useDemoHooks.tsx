import { useState, useEffect } from 'react';
import axios from 'axios';
import { DemoResponse } from '@codewit/interfaces';

// Fetch multiple demos
const useFetchDemos = () => {
  const [demos, setDemos] = useState<DemoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDemos = async () => {
      try {
        const response = await axios.get('/demos');
        setDemos(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDemos();
  }, []);

  return { demos, loading, error, setDemos };
};

// Fetch a single demo
const useFetchSingleDemo = (uid: string) => {
  const [demo, setDemo] = useState<DemoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (uid) {
      const fetchDemo = async () => {
        try {
          const response = await axios.get(`/demos/${uid}`);
          setDemo(response.data);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchDemo();
    }
  }, [uid]);

  return { demo, loading, error };
};

// Patch a demo
const usePatchDemo = () => {
  const patchDemo = async (demoData: any, uid: number) => {
    try {
      const response = await axios.patch(`/demos/${uid}`, demoData);
      return response.data;
    } catch (error) {
      throw Error();
    }
  };

  return { patchDemo };
};

// Post a new demo
const usePostDemo = () => {
  const postDemo = async (demoData: any) => {
    try {
      const response = await axios.post('/demos', demoData);
      return response.data;
    } catch (error) {
      throw Error();
    }
  };

  return { postDemo };
};

// Delete a demo
const useDeleteDemo = (onSuccess: (demoUid: number) => void) => {
  const [isDeleting, setIsDeleting] = useState<{ [key: number]: boolean }>({});
  const [error, setError] = useState(false);

  const deleteDemo = async (demoUid: number) => {
    setIsDeleting(prev => ({ ...prev, [demoUid]: true }));
    try {
      await axios.delete(`/demos/${demoUid}`);
      onSuccess(demoUid);
    } catch (error) {
      setError(true);
    } finally {
      setIsDeleting(prev => ({ ...prev, [demoUid]: false }));
    }
  };

  return { deleteDemo, isDeleting, error };
};

// Delete a demo exercise
const useDeleteDemoExercise = () => {

  const deleteDemoExercise = async (exercises: any, uid: number): Promise<any> => {
    try {      
      const response = await axios.delete(`/demos/${uid}/exercises`, {data: exercises});
      return response.data; 
    } catch (error) {
      throw Error();
    }
  };

  return { deleteDemoExercise }; 
};
 
// Patch a demo exercise
const usePatchDemoExercise = () => {

  const patchDemoExercise = async (exercises: any, uid: number): Promise<any> => {
    try {
      const response = await axios.patch(`/demos/${uid}/exercises`, exercises);
      return response.data; 
    } catch (error) {
      throw Error();
    }
  };

  return { patchDemoExercise }; 
};


export {
  useFetchDemos,
  useFetchSingleDemo,
  usePatchDemo,
  usePatchDemoExercise,
  usePostDemo,
  useDeleteDemo,
  useDeleteDemoExercise
};
