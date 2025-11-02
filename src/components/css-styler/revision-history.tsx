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
import { getRevisions, updateRevisionName, deleteRevision } from './revision-storage';
import { toast } from 'sonner';

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
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false);
  const [snapshotName, setSnapshotName] = useState('');

  // Load revisions from localStorage
  useEffect(() => {
    setRevisions(getRevisions());
  }, []);

  const handleCreateSnapshot = () => {
    if (snapshotName.trim()) {
      onCreateSnapshot(snapshotName.trim());
      setSnapshotName('');
      setIsCreatingSnapshot(false);
      toast.success('Snapshot created successfully');
    } else {
      onCreateSnapshot();
      toast.success('Snapshot created successfully');
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
      toast.success(`Restored to: ${revision.name}`);
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
      toast.success('Revision name updated');
    }
  };

  const handleDeleteRevision = (revisionId: string) => {
    deleteRevision(revisionId);
    setRevisions(getRevisions());
    toast.success('Revision deleted');
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
            CSS Revisions
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {revisions.length}/10
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 pt-0">
        <div className="px-4 pb-3">
          {!isCreatingSnapshot ? (
            <Button
              onClick={() => setIsCreatingSnapshot(true)}
              className="w-full"
              size="sm"
            >
              <Camera className="w-4 h-4 mr-2" />
              Create Snapshot
            </Button>
          ) : (
            <div className="space-y-2">
              <Input
                placeholder="Snapshot name (optional)"
                value={snapshotName}
                onChange={(e) => setSnapshotName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateSnapshot();
                  } else if (e.key === 'Escape') {
                    setIsCreatingSnapshot(false);
                    setSnapshotName('');
                  }
                }}
                autoFocus
              />
              <div className="flex gap-2">
                <Button onClick={handleCreateSnapshot} size="sm" className="flex-1">
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setIsCreatingSnapshot(false);
                    setSnapshotName('');
                  }}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <ScrollArea className="h-[calc(100%-120px)] px-4">
          {revisions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No snapshots yet</p>
              <p className="text-sm">Create your first snapshot to save the current CSS state</p>
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
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteRevision(revision.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
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
            <AlertDialogTitle>Restore Revision?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace your current CSS with the selected snapshot.
              Any unsaved changes will be lost.
              <br /><br />
              <strong>
                {revisions.find(r => r.id === confirmRestoreId)?.name}
              </strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRestore}>Restore</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};