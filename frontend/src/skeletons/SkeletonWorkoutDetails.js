import Shimmer from "./Shimmer";
import SkeletonBase from "./SkeletonBase";

const SkeletonWourkoutDetails = () => {
  return ( 
    <div className="skeleton-wrapper">
      <div className="skeleton-workout-details">
        <SkeletonBase type="title" />
        <SkeletonBase type="text" />
        <SkeletonBase type="text" />
        <SkeletonBase type="text" />
      </div>
      <Shimmer />
    </div>
   );
}
 
export default SkeletonWourkoutDetails;