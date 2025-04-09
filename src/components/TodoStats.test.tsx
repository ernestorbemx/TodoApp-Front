import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Stats,  } from "../types";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { formatTime, TodoStats } from "./TodoStats";


vi.mock('./TodoStats', { spy: true })
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
            screen.getByText("Average time to complete remaining tasks:")
        ).toBeDefined()
    
    })

    it("should show when no stats available", () => {
        render(<TodoStats data={undefined}/>)
        expect(
            screen.getByText("No stats at the moment")
        ).toBeDefined()
    })

    it("should format time correctly", () => {
        expect(formatTime(60)).toBe("01:00")
        expect(formatTime(621)).toBe("10:21")
        expect(formatTime(59)).toBe("00:59")
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