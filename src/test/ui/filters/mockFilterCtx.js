import * as useFilter from "../../../filters/FilterCtx/useFilter";

export default function mockUseFilter() {
    const mockedUseFilter = () => {
        return {
            filter: undefined,
            setFilterOptions: () => {},
            setInvertedFilterState: () => {},
        };
    };
    jest.spyOn(useFilter, "default").mockImplementation(mockedUseFilter);
}
