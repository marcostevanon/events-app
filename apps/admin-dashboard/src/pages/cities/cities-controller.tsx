import { City } from '@events-app/models';
import { collection } from 'firebase/firestore';
import { CityDto } from 'libs/models/src/admin/cityDto.model';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../app/firebase';

interface NavigateToEventsProps {
  cityId: string;
}

interface CitiesHook {
  isLoading: boolean;
  cities: City[];
  navigateToCityEvents: (props: NavigateToEventsProps) => void;
}

export const useCities = (): CitiesHook => {
  const navigate = useNavigate();
  const [value, isLoading, error] = useCollection(collection(db, 'cities'));

  React.useEffect(() => {
    // TODO manage error
    if (error) console.log('useCities ~ error', error);
  }, [error]);

  const cities: City[] = React.useMemo(() => {
    if (!value) {
      return [];
    }
    const cityList: City[] = [];
    value.forEach((ct) => {
      const city = new City(ct.data() as CityDto);
      city.id = ct.id;
      cityList.push(city);
    });
    return cityList;
  }, [value]);

  const navigateToCityEvents = React.useCallback(
    ({ cityId }: NavigateToEventsProps) => {
      navigate(`/dashboard/cities/${cityId}/events`);
    },
    [navigate]
  );

  return { isLoading, cities, navigateToCityEvents };
};
