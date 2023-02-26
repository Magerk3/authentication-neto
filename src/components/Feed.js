export const Feed = ({ feedData }) => {
    return (
        <div>
            {Array.isArray(feedData) ? feedData.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <img src={post.image} alt="..."></img>
                    <p>{post.content}</p>
                </div>
            )) : null }
        </div>
    );
};
