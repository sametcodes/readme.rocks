import { use } from 'react';
import logo from './logo.png';
import Image from 'next/image';

export const CodeWars = () => {
    const result = use(fetch('http://localhost:3000/api/platform/codewars').then(res => res.json()));
    if(result.error){
        return <div>
                <Image src={logo} alt="CodeWars Logo" width={30} height={30} />
                Error
            </div>

    }

    return (
        <div>
            <Image src={logo} alt="CodeWars Logo" width={30} height={30} />
            totalCompleted: {result.codeChallenges.totalCompleted}
        </div>
    )
}