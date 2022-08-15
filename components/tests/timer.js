import React, {memo} from 'react';
import Countdown from 'react-countdown';
import { zeroPad } from 'react-countdown';
import { useRouter } from 'next/router';


const MyCountDown = (props) => {
    const router = useRouter();

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            router.push('/tests/result/'+props.test_id)
        } else {
            return <span>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
        }
    };

    function trackTime(e) {
        localStorage.setItem("time", JSON.stringify(e));
    }

    return(
        <Countdown date={Date.now() + 60000 * props.duration} rendered={renderer} onTick={trackTime} controlled={false} />

    )
}

export const MemoizedCountdown = memo(MyCountDown);