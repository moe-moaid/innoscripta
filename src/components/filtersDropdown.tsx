
type Props = {
    filterName: string;
    filterOptions: string[];
    selectedValue: string;
    onChange: (value: string) => void;
}
function FiltersDropdown({ filterName, filterOptions, selectedValue, onChange }: Props) {
  return (
      <div>
           <div className="flex flex-col md:flex-row justify-center my-4 gap-4">
      <select name={filterName} value={selectedValue} onChange={(e) => onChange(e.target.value)} className="px-4 py-2 border rounded-lg">
                  <option value="">All { filterName }</option>
        {filterOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
    </div>
  )
}

export default FiltersDropdown