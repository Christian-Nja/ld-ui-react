import Collection from "./components/Collection/Collection";
import PartWhole from "./components/PartWhole/PartWhole";
import Depiction from "./components/Resource/Depiction";
import KG from "./components/KnowledgeGraph/KG";
import Graph from "./components/classes/Graph";
import { scaleData } from "./utilities/math";
import ImageGrid from "./components/ImageGrid/ImageGrid";
import PropertyValueList from "./components/PropertyValueList/PropertyValueList";
import Measurement from "./measurements/Measurement";
import ODPReactor from "./components/KnowledgeGraph/ODPReactor";
import KnowledgeGraph from "./classes/KnowledgeGraph";
import Resource from "./classes/Resource";
import ColorGenerator from "./components/classes/ColorGenerator";
import ResourceFactory from "./classes/ResourceFactory";
import PatternsAndClassesPage from "./pages/PatternsAndClassesPage";
import PatternInstancesPage from "./pages/PatternInstancesPage";
import ResourcesWithViewControllerPage from "./pages/ResourcesWithViewControllerPage";

/**
 * Available components
 */
export {
    ODPReactor,
    KnowledgeGraph,
    Graph,
    Measurement,
    Resource,
    scaleData,
    Collection,
    PartWhole,
    Depiction,
    KG,
    ImageGrid,
    PropertyValueList,
    ColorGenerator,
    ResourceFactory,
    PatternsAndClassesPage,
    PatternInstancesPage,
    ResourcesWithViewControllerPage,
};
