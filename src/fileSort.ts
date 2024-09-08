function compareFiles(a: string, b: string): number {
    const regex = /(\D+)(\d+)/;

    const regex2 = /(\D+)(\d+)/

    const matchA = a.match(regex);
    const matchB = b.match(regex);



    if (matchA && matchB) {
        // Compare the non-numeric parts first
        const nameA = matchA[1];
        const nameB = matchB[1];

        if (nameA !== nameB) {
            return nameA.localeCompare(nameB);
        }

        // Compare the numeric parts, converting to numbers to handle "file01" vs "file1" correctly
        const numA = parseInt(matchA[2], 10);
        const numB = parseInt(matchB[2], 10);

        // const numA = Number(matchA[2]);
        // const numB = Number(matchB[2]);

        return numA - numB;
    }

    // Fallback to default string comparison if regex match fails
    return a.localeCompare(b);
}

function sortFiles(files: string[]): string[] {
    return files.sort(compareFiles);
}

// Example usage
const files = ["file", "file1", "file10", "file2", "file01"];
const sortedFiles = sortFiles(files);

console.log(sortedFiles);