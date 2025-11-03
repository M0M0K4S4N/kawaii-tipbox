"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  History,
  Camera,
  Edit3,
  Trash2,
  RotateCcw,
  MoreHorizontal,
  Clock
} from 'lucide-react';
import { CSSRevision } from './revision-control-types';
import { getRevisions, updateRevisionName, deleteRevision, clearAllRevisions } from './revision-storage';

interface RevisionHistoryProps {
  onRestoreRevision: (revision: CSSRevision) => void;
  onCreateSnapshot: (name?: string) => void;
  cssText: string;
  styles?: any;
}

export const RevisionHistory = ({
  onRestoreRevision,
  onCreateSnapshot,
  cssText,
  styles
}: RevisionHistoryProps) => {
  const [revisions, setRevisions] = useState<CSSRevision[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [confirmRestoreId, setConfirmRestoreId] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false);
  const [snapshotName, setSnapshotName] = useState('');

  const MAX_REVISIONS_TEXT = process.env.NEXT_PUBLIC_MAX_REVISIONS || '∞';

  // Load revisions from localStorage
  useEffect(() => {
    setRevisions(getRevisions());
  }, []);

  const handleCreateSnapshot = () => {
    if (snapshotName.trim()) {
      onCreateSnapshot(snapshotName.trim());
      setSnapshotName('');
      setIsCreatingSnapshot(false);
    } else {
      onCreateSnapshot();
    }

    // Refresh the revisions list
    setTimeout(() => {
      setRevisions(getRevisions());
    }, 100);
  };

  const handleRestoreRevision = (revision: CSSRevision) => {
    setConfirmRestoreId(revision.id);
  };

  const confirmRestore = () => {
    const revision = revisions.find(r => r.id === confirmRestoreId);
    if (revision) {
      onRestoreRevision(revision);
    }
    setConfirmRestoreId(null);
  };

  const handleEditName = (revision: CSSRevision) => {
    setEditingId(revision.id);
    setEditingName(revision.name);
  };

  const handleSaveName = () => {
    if (editingId && editingName.trim()) {
      updateRevisionName(editingId, editingName.trim());
      setRevisions(getRevisions());
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleDeleteRevision = (revisionId: string) => {
    deleteRevision(revisionId);
    setRevisions(getRevisions());
  };

  const handleClearAllRevisions = () => {
    clearAllRevisions();
    setRevisions([]);
    setConfirmClearAll(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="w-5 h-5" />
            ประวัติการเปลี่ยนแปลง
          </CardTitle>
          <div className="flex items-center gap-2">
            {revisions.length > 0 && (
              <Button
                onClick={() => setConfirmClearAll(true)}
                size="sm"
                variant="outline"
                className="h-7 px-2 text-xs"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                ล้างทั้งหมด
              </Button>
            )}
            <Badge variant="secondary" className="text-xs">
              {revisions.length}/{MAX_REVISIONS_TEXT}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 pt-0 overflow-scroll">
        <div className="px-4 pb-3">
          {!isCreatingSnapshot ? (
            <Button
              onClick={() => setIsCreatingSnapshot(true)}
              className="w-full"
              size="sm"
            >
              <Camera className="w-4 h-4 mr-2" />
              บันทึกการเปลี่ยนแปลงปัจจุบัน
            </Button>
          ) : (
            <div className="space-y-2">
              <Input
                placeholder="ชื่อ (ไม่จำเป็นต้องใส่)"
                value={snapshotName}
                onChange={(e) => setSnapshotName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsCreatingSnapshot(false);
                    setSnapshotName('');
                  }
                }}
                autoFocus
              />
              <div className="flex gap-2">
                <Button onClick={handleCreateSnapshot} size="sm" className="flex-1">
                  บันทึก
                </Button>
                <Button
                  onClick={() => {
                    setIsCreatingSnapshot(false);
                    setSnapshotName('');
                  }}
                  variant="outline"
                  size="sm"
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          )}
        </div>

        <ScrollArea className="flex-1 px-4">
          {revisions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>ยังไม่มีประวัติที่บันทึกไว้</p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {revisions.map((revision) => (
                <Card key={revision.id} className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {editingId === revision.id ? (
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onBlur={handleSaveName}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveName();
                            } else if (e.key === 'Escape') {
                              setEditingId(null);
                              setEditingName('');
                            }
                          }}
                          className="text-sm h-7"
                          autoFocus
                        />
                      ) : (
                        <h4 className="font-medium text-sm truncate">{revision.name}</h4>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          #{revision.number}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDate(revision.timestamp)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => handleRestoreRevision(revision)}
                        size="sm"
                        variant="outline"
                        className="h-7 px-2"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditName(revision)}>
                            <Edit3 className="w-4 h-4 mr-2" />
                            เปลี่ยนชื่อ
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteRevision(revision.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            ลบ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <AlertDialog open={!!confirmRestoreId} onOpenChange={() => setConfirmRestoreId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการคืนค่า</AlertDialogTitle>
            <AlertDialogDescription>
              การดำเนินการนี้จะทำให้ CSS ปัจจุบันของคุณ ถูกแทนที่ ด้วย Snapshot ที่คุณเลือก
              <br /><br />
              <strong>
                {revisions.find(r => r.id === confirmRestoreId)?.name}
              </strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRestore}>ดำเนินการต่อ</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmClearAll} onOpenChange={setConfirmClearAll}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการล้างประวัติทั้งหมด</AlertDialogTitle>
            <AlertDialogDescription>
              การดำเนินการนี้จะลบประวัติการเปลี่ยนแปลงทั้งหมด ({revisions.length} รายการ) และไม่สามารถกู้คืนได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAllRevisions} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              ล้างทั้งหมด
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};