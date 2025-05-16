import { Trail } from '@/types/trails'
import Image from 'next/image';
import React from 'react'

interface Props {
    trail: Trail
}

function TrailCard(props: Props) {
    const { trail } = props;

    return (
        <div>
            <Image src={trail.imageUrl} alt="TrailImage" />
            <h2>{trail.name}</h2>
        </div>
    )
}

export default TrailCard
