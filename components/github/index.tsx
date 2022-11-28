import { use } from 'react';
import logo from './logo.png';
import Image from 'next/image';

export const GitHub = () => {
    const data = use(fetch('http://localhost:3000/api/github').then(res => res.json()));

    return (
        <div>
            <Image src={logo} alt="GitHub Logo" width={30} height={30} />
            totalContributions: {data.data.user.contributionsCollection.contributionCalendar.totalContributions}
        </div>
    )
}