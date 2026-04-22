'use client';

import React from 'react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { GraduationCap } from "lucide-react";
import { TimelineLayout, TimelineItemProps } from '@/components/timeline-layout';

export default function EducationPage() {
  const t = useTranslations('Education');
  
  const education: TimelineItemProps[] = [
    {
      title: t('mscTitle'),
      subtitle: t('mscInst'),
      date: t('mscDate'),
      description: t('mscDesc'),
      icon: GraduationCap
    },
    {
      title: t('bscTitle'),
      subtitle: t('bscInst'),
      date: t('bscDate'),
      description: t('bscDesc'),
      icon: GraduationCap
    },
    {
      title: t('dipTitle'),
      subtitle: t('dipInst'),
      date: t('dipDate'),
      description: t('dipDesc'),
      icon: GraduationCap
    },
    {
      title: t('schoolTitle'),
      subtitle: t('schoolInst'),
      date: t('schoolDate'),
      description: t('schoolDesc'),
      icon: GraduationCap
    }
  ];

  return (
    <TimelineLayout 
      title={t('pageTitle')} 
      subtitle={t('pageSubtitle')} 
      items={education} 
      icon={GraduationCap}
    />
  );
}
