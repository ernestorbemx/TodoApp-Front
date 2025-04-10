import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Stats,  } from "../types";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { TodoStats } from "./TodoStats";
import { formatTime } from "../utils";

vi.mock('../utils', { spy: true })
// const formatTimeMock = vi.mocked(formatTime)


describe("test TodoStats component and formatTime", () => {

    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();
    });

    afterEach(() => {
        vi.clearAllMocks();
    })

    const emptyStats: Stats = {
        avg: -1,
        highPriorityAvg: -1,
        lowPriorityAvg: -1,
        mediumPriorityAvg: -1
    }

    it("should render", () => {
        render(<TodoStats data={emptyStats} />)
        expect(
            screen.getByText( t => t.includes("Average time to complete by"))
        ).toBeDefined()
    
    })

    it("should show when no stats available", () => {
        render(<TodoStats data={undefined}/>)
        expect(
            screen.getByText("No stats at the moment")
        ).toBeDefined()
    })

    it.skip("should call formatTime four times when data is all set", () => {
        render(<TodoStats data={{ 
            avg: 50,
            highPriorityAvg: 30,
            lowPriorityAvg: 40,
            mediumPriorityAvg: 20
        }}/>)
        expect(formatTime).toHaveBeenCalledTimes(3)
    })

})