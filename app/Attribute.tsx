"use client"
import { useContext, useEffect } from "react"
import { PersonalizeContext } from './context/PersonalizeContext';

export default function Attribute() {
    const Personalize = useContext(PersonalizeContext);

    useEffect(() => {
        Personalize.set({ homeowner: true });
    })
    return <></>
}