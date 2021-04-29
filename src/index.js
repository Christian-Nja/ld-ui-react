import Collection from "./components/Collection/Collection";
import PartWhole from "./components/PartWhole/PartWhole";
import Depiction from "./components/Resource/Depiction";
import { scaleData } from "./utilities/math";
import findSliderDomain from "./components/filters/facets/findSliderDomain";
import ImageGrid from "./components/ImageGrid/ImageGrid";
import PropertyValueList from "./components/PropertyValueList/PropertyValueList";
import Measurement from "./measurements/Measurement";
import KnowledgeGraph from "./classes/KnowledgeGraph";
import Resource from "./classes/Resource";
import ResourceFactory from "./classes/ResourceFactory";
import PatternsAndClassesPage from "./pages/PatternsAndClassesPage";
import PatternInstancesPage from "./pages/PatternInstancesPage";
import ResourcesPage from "./pages/ResourcesPage";

/**
 * Available components
 */
export {
    KnowledgeGraph,
    Measurement,
    Resource,
    scaleData,
    findSliderDomain,
    Collection,
    PartWhole,
    Depiction,
    ImageGrid,
    PropertyValueList,
    ResourceFactory,
    PatternsAndClassesPage,
    PatternInstancesPage,
    ResourcesPage,
};
