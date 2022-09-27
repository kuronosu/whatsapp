import tw from "tailwind-styled-components";
import styled from "styled-components";

const Container = tw.section<any>`
    w-[95%]
    ml-4
    h-[90%]
    bg-zinc-700
    rounded-lg
`;

function Pending() {
    return (
        <div className="flex-col h-[95%] ">
            <p className="text-white text-xl m-4">Requests</p>
            <Container>
                <ul>
                    <li>
                        dasd
                    </li>
                    <li>
                        dasd
                    </li>
                    <li>
                        dasd
                    </li>
                    <li>
                        dasd
                    </li>
                </ul>
            </Container>
        </div>
    )
}

export default Pending;