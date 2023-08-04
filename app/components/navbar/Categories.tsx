"use client"

import React from 'react'
import Container from '../Container'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa'
import { IoDiamond } from 'react-icons/io5'
import { BsSnow } from 'react-icons/bs'
import CategoryBox from './CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to beach'
    },
    {
        label: 'windmills',
        icon: GiWindmill,
        description: 'This property is close to windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is close to modern'
    },   
    {
        label: 'CountrySide',
        icon: TbMountain,
        description: 'This property is close to Coutry side'
    },   
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property is close to pools'
    },   
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is close to island'
    },   
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to lake'
    },   
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property is close to skiing'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is close to castel'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property is close to camping'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is close to snow'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is close to cave'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is close to desert'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is close to barn'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is close to luxuries'
    },
]
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathName = usePathname();

    const isMainPage = pathName === '/';

    if(!isMainPage) return null;

  return (
    <Container>
        <div className="py-4 flex items-center justify-between overflow-x-auto">
            {categories.map((items) => (
                <CategoryBox
                    key={items.label}
                    label={items.label}
                    selected={category === items.label}
                    icon={items.icon}
                />
            ))}
        </div>
    </Container>
  )
}

export default Categories