import { $Utilities } from "../../../utilities/utilities-repository";
import Avatar from "../../../assets/images/avatar-generations_rpge.jpg";
export default function Comment({ comment }) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full self-start shrink-0 overflow-hidden cursor-pointer border-1 border-blue-300 flex items-center justify-center">
          <img src={comment?.commentCreator?.photo || Avatar} alt="" />
        </div>
        <div>
          <div className="bg-white p-3 rounded-xl mb-3">
            <h6 className="font-semibold text-sm">
              {comment?.commentCreator?.name}
            </h6>
            <p className="text-sm text-neutral-500">
              {comment?.content}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem
              molestias nulla. Vitae velit molestiae corrupti corporis
              voluptatem ex minus vel ipsa optio distinctio minima nulla, omnis
              blanditiis dolorum vero error doloribus modi nam quibusdam. Nobis
              perspiciatis illum error suscipit cumque reprehenderit minima,
              assumenda totam iste quasi earum quis magni dolore, sint eos
              consequuntur animi voluptatem fuga commodi optio, inventore iusto?
              Temporibus harum sapiente ratione dolore fuga, quisquam hic odit
              illo! Voluptatibus voluptate hic saepe, magnam molestiae sint
              quae, ratione atque beatae enim at sed repellendus et nulla nobis
              explicabo expedita laborum, quasi dolor consequatur est! Dolores
              magni quia eius nisi, ipsa reprehenderit possimus a fuga quo
              aliquam quis nobis facere cumque adipisci magnam obcaecati
              necessitatibus mollitia iste explicabo. Ex quasi deserunt
              repudiandae error soluta corporis rem aspernatur omnis pariatur
              voluptas iure blanditiis, excepturi rerum eos provident
              consequuntur fugit, tempora eum, maxime reiciendis? Dolorum
              dolores nulla doloremque, in nobis quia magni sed, autem
              perspiciatis ex consectetur fuga, debitis explicabo reprehenderit.
              Itaque qui debitis rem. Impedit sequi deleniti ducimus,
              perspiciatis culpa soluta fuga laboriosam facilis tempore quam
              autem natus molestiae quis mollitia eveniet delectus voluptatem
              optio suscipit quia laudantium dolore. Vero quae neque blanditiis
              distinctio. Vitae quod nihil quo voluptatum nam?
            </p>
          </div>

          <p className="text-sm font-semibold text-neutral-400">
            {$Utilities.Dates.displayPostAndCommentDate(comment.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
