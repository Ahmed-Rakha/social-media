import Avatar from "../../../assets/images/avatar-generations_rpge.jpg";
import { $HOOKS_REPOSITORY } from "../../../hooks/hooks_repository";
import ImageInFullScreen from "../../shared-components/images/ImageInFullScreen";
export default function PostBody({ postBody }) {
  const { openViewerImage, setOpenViewerImage } = $HOOKS_REPOSITORY.useImageInFullScreen();
  return (
    <>
      {openViewerImage && (
        <ImageInFullScreen
          openViewerImage={openViewerImage}
          setOpenViewerImage={setOpenViewerImage}
        />
      )}
      <div className="mt-5">
        {postBody?.content && (
          <p className="text-sm mb-3">{postBody?.content}</p>
        )}
        {postBody?.image && !postBody?.image.includes("undefined") && (
          <div onClick={() => setOpenViewerImage(postBody?.image)} className="w-full overflow-hidden rounded-sm cursor-pointer border-1 border-neutral-100 flex items-center justify-center">
            <img src={postBody?.image || Avatar} alt="PostImage" />
          </div>
        )}
      </div>
    </>
  );
}
