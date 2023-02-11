import { use } from 'react';
import logo from './logo.png';
import Image from 'next/image';

export const GitHub = () => {
    const result = use(fetch('http://localhost:3000/api/platform/github').then(res => res.json()));

    if(result.error){
        console.log("github", result)
        return <div>
            <Image src={logo} alt="GitHub Logo" width={30} height={30} />
            Error
        </div>
    }

    return (
        <div>
            <Image src={logo} alt="GitHub Logo" width={30} height={30} />
            totalContributions: {result.data.user.contributionsCollection.contributionCalendar.totalContributions}
        </div>
    )
}