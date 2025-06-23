<?php

namespace App\Repositories\Base;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface EloquentRepositoryInterface
{
    /**
     * findByLast
     */
    public function findByLast(
        array $paramsAnddData,
        array $columns = ['*'],
        array $relations = []
    ): ?Model;

    /**
     * all
     *
     * @param  mixed  $columns
     * @param  mixed  $relations
     * @param  mixed  $orderBY
     * @param  mixed  $order
     */
    public function all(array $columns = ['*'], array $relations = [], string $orderBY = 'id', string $order = 'asc'): Collection;

    /**
     * Method limit
     *
     * @param  int  $limit  [limit]
     * @param  array  $columns  [required columns]
     * @param  array  $relations  [required relations]
     */
    public function limit(int $limit, array $columns = ['*'], array $relations = []): Collection;

    /**
     * Method paginate
     *
     * @param  int  $number  [number of records per page]
     */
    public function paginate(int $number);

    /**
     * Get all trashed models.
     */
    public function allTrashed(): Collection;

    /**
     * Find model by id.
     */
    public function findById(
        int $modelId,
        array $columns = ['*'],
        array $relations = [],
        array $appends = []
    ): ?Model;

    /**
     * Find model by id.
     */
    public function findByUuId(
        string $modelUuId,
        array $columns = ['*'],
        array $relations = [],
        array $appends = []
    ): ?Model;

    /**
     * Find model by id.
     *
     * @param  array  $modelId
     * @param  array  $appends
     */
    public function findByColumn(
        array $paramsAnddData,
        array $columns = ['*'],
        array $relations = []
    ): ?Model;

    /**
     * Find model by columns.
     *
     * @param  array  $modelId
     * @param  array  $appends
     */
    public function getByColumn(
        array $paramsAnddData,
        array $columns = ['*'],
        array $relations = []
    ): ?Collection;

    /**
     * Find model by existsByColumn.
     *
     * @param  array  $modelId
     */
    public function existsByColumn(
        array $paramsAnddData,
        array $columns = ['*']
    ): ?bool;

    /**
     * Find trashed model by id.
     */
    public function findTrashedById(int $modelId): ?Model;

    /**
     * Find only trashed model by id.
     */
    public function findOnlyTrashedById(int $modelId): ?Model;

    /**
     * Create a model.
     */
    public function create(array $payload): ?Model;

    /**
     * Method createMany
     *
     * @param  array  $payloadCollection  [collection of payload]
     */
    public function createMany(array $payloadCollection): ?Collection;

    /**
     * Update existing model.
     */
    public function update(int $modelId, array $payload): bool;

    public function updateWithTrashed(int $modelId, array $payload): bool;

    /**
     * Delete model by id.
     */
    public function deleteById(int $modelId): bool;

    /**
     * Restore model by id.
     */
    public function restoreById(int $modelId): bool;

    /**
     * Permanently delete model by id.
     */
    public function permanentlyDeleteById(int $modelId): bool;

    /**
     * filter
     *
     * @param  mixed  $filters
     * @param  mixed  $with
     */
    public function filter($filters, $with = []): LengthAwarePaginator;

    /**
     * filterWithParam
     *
     * @param  mixed  $filters
     * @param  mixed  $with
     * @param  mixed  $params
     */
    public function filterWithParam($filters, $with = [], $params = []): LengthAwarePaginator;

    /**
     * filterWithDateRange
     *
     * @param  mixed  $filters
     * @param  mixed  $with
     * @param  mixed  $params
     */
    public function filterWithDateRange($filters, $with = [], $params = []): LengthAwarePaginator;

    public function updateOrCreate(array $attributes, array $values = []): Model;


    public function getById($id);

    public function getReplies(int $modelId): Collection;


}
