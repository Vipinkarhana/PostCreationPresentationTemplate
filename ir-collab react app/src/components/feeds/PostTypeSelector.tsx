import { PostType } from "../../types/presentation";

interface PostTypeSelectorProps {
  selectedPostType: string;
  onPostTypeChange: (typeId: string) => void;
  postTypes: PostType[];
}

export const PostTypeSelector = ({
  selectedPostType,
  onPostTypeChange,
  postTypes,
}: PostTypeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {postTypes.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onPostTypeChange(type.id)}
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
            selectedPostType === type.id
              ? `bg-gradient-to-r ${
                  type.theme.gradient
                } text-white shadow-lg shadow-${
                  type.id === "research"
                    ? "blue"
                    : type.id === "question"
                    ? "purple"
                    : type.id === "collaboration"
                    ? "green"
                    : type.id === "announcement"
                    ? "orange"
                    : type.id === "discussion"
                    ? "indigo"
                    : type.id === "dataset"
                    ? "teal"
                    : type.id === "funding"
                    ? "yellow"
                    : "rose"
                }-500/25`
              : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200"
          }`}
        >
          <span className="text-lg mr-2">{type.icon}</span>
          <span className="hidden sm:inline font-semibold">{type.label}</span>
          <span className="sm:hidden">{type.icon}</span>
        </button>
      ))}
    </div>
  );
};
