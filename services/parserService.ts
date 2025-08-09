export interface CommitteeInfo {
  name: string;
  tagline: string;
  topic: string;
  details: Record<string, string>;
}

const parseCommitteeDetails = (text: string): Record<string, string> => {
    const details: Record<string, string> = {};
    const detailRegex = /\*\*([^\*]+)\*\*:\s(.*?)(?=\n\*\*|$)/gs;
    let match;
    while((match = detailRegex.exec(text)) !== null) {
        details[match[1].trim()] = match[2].trim();
    }
    return details;
}

export const fetchAndParseCommittees = async (): Promise<CommitteeInfo[]> => {
  try {
    const response = await fetch('/knowledge.txt');
    if (!response.ok) {
      throw new Error('Failed to fetch knowledge base.');
    }
    const text = await response.text();
    const committees: CommitteeInfo[] = [];
    
    // Regex to find committee blocks starting with '###'
    const committeeRegex = /###\s(.*?)\s-\s(.*?)\n\*\*Topic:\*\*\s(.*?)\n([\s\S]*?)(?=\n###|\nFrequently Asked Questions)/g;
    
    let match;
    while ((match = committeeRegex.exec(text)) !== null) {
      const [_, name, tagline, topic, detailsText] = match;
      committees.push({
        name: name.trim(),
        tagline: tagline.trim(),
        topic: topic.trim(),
        details: parseCommitteeDetails(detailsText),
      });
    }

    return committees;
  } catch (error) {
    console.error("Error parsing committees:", error);
    return [];
  }
};
