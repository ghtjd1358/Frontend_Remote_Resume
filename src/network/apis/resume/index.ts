import { createClient } from '@supabase/supabase-js';
import { DownloadResumeCommand, GetResumeUrlCommand } from './types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const RESUME_BUCKET = 'hoseong_resumes';

/**
 * Download resume PDF from Supabase Storage
 */
export const downloadResume = async (command: DownloadResumeCommand = {}) => {
  const { fileName = 'resume.pdf' } = command;

  try {
    const { data, error } = await supabase.storage
      .from(RESUME_BUCKET)
      .download(fileName);

    if (error) {
      console.error('Error downloading resume:', error);
      throw error;
    }

    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error('Failed to download resume:', error);
    return { success: false, error: String(error) };
  }
};

/**
 * Get public URL for resume PDF
 */
export const getResumePublicUrl = (command: GetResumeUrlCommand = {}) => {
  const { fileName = 'resume.pdf' } = command;

  const { data } = supabase.storage
    .from(RESUME_BUCKET)
    .getPublicUrl(fileName);

  return { publicUrl: data.publicUrl };
};
