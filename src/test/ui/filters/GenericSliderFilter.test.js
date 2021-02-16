import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import GenericSliderFilter from "../../../components/filters/facets/GenericSliderFilter";
import mockUseFilter from "./mockFilterCtx";

configure({ adapter: new Adapter() }); //enzyme - react 16 hooks support

describe("<GenericSliderFilter />", () => {
    it("renders without explode", () => {
        mockUseFilter();
        shallow(<GenericSliderFilter />);
    });
});
