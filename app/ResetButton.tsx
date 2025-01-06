"use client";
import { useContext } from 'react';
import { PersonalizeContext } from './context/PersonalizeContext';
export default function ResetButton() {

  const Personalize = useContext(PersonalizeContext);

  function reset() {
    Personalize.set({homeowner:false})
  }

  return (
    <>
      <button
        onClick={() => reset()}
        className="text-sm/6 font-semibold text-gray-900"
      >
        Reset Personalize
      </button>
    </>
  );
}
