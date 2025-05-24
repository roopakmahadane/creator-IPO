export default function CreatorCard({creator}){
        
    const {
            username: { value: handle },
            score,
            createdAt,
            metadata: { name, bio, picture, coverPicture },
          } = creator;
        
    return (
      <div className="mx-3 my-1 w-sm h-full rounded-2xl overflow-hidden bg-black cursor-pointer">
      <div className="w-full h-24">
        {coverPicture ? (
          <img
            src={coverPicture}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />
        )}
      </div>
      <div className="p-2">
        <div className="flex items-center gap-4">
          <img
            src={picture}
            alt="Profile"
            className="w-14 h-14 rounded-full border-2 border-white -mt-10 bg-white object-cover"
          />
          <div>
            <h2 className="text-lg text-gray-200 font-semibold">{name || handle}</h2>
            <p className="text-sm text-gray-200">{handle}</p>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-2 pl-1 line-clamp-3">{bio}</p>
      </div>
    </div>
    
    )
}