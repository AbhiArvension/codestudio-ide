export const downloadCode = (code, language) => {
  // Determine file extension based on language
  const extension = language === 'python' ? 'py' : 'js';
  const filename = `code.${extension}`;

  // Create a blob from the code
  const blob = new Blob([code], { type: 'text/plain' });

  // Create a temporary download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
