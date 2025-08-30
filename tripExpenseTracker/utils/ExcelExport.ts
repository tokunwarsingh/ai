import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { Expense } from '../context/ExpenseContext'; // Adjust path as needed
import { Platform } from 'react-native';

export const exportExpensesToExcel = async (expenses: Expense[], tripName: string) => {
  // Prepare data for Excel
  const data = expenses.map(expense => ({
    Description: expense.description,
    Amount: expense.amount,
    Date: expense.date.toLocaleDateString(),
    Category: expense.category || 'N/A',
    UserId: expense.userId, // Include user ID for tracking
  }));

  // Create a new workbook and worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Expenses');

  // Generate Excel file
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: 'xlsx',
  });

  const filename = `${tripName}_Expenses.xlsx`;
  const uri = FileSystem.documentDirectory + filename;

  try {
    if (Platform.OS === 'web') {
      // For web, create a Blob and download
      const blob = new Blob([s2ab(atob(wbout))], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // For mobile (iOS/Android), save to file system and share
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        UTI: 'com.microsoft.excel.xlsx',
      });
    }
    alert('Expenses exported to Excel successfully!');
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    alert('Failed to export expenses to Excel.');
  }
};

// Helper function for web export
function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}