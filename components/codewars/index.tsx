import { use } from 'react';
import logo from './logo.png';
import Image from 'next/image';

export const CodeWars = () => {
    const data = use(fetch('http://localhost:3000/api/codewars').then(res => res.json()));

    return (
        <div>
            <Image src={logo} alt="CodeWars Logo" width={30} height={30} />
            totalCompleted: {data.data.codeChallenges.totalCompleted}
        </div>
    )
}